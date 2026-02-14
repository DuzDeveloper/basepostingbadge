// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title GenesisCollection
 * @dev NFT Collection con mint gratuito y características mejoradas
 * 
 * Características:
 * - Mint gratuito (solo gas fees)
 * - Un NFT por wallet
 * - Sistema de pausa de emergencia
 * - Metadata dinámico
 * - Eventos detallados para tracking
 */
contract GenesisCollection is ERC721, Ownable, Pausable {
    using Strings for uint256;

    // ============ State Variables ============
    
    uint256 private _tokenIdCounter;
    uint256 public immutable MAX_SUPPLY;
    string private _baseTokenURI;
    
    // Timestamp de cuando se desplegó el contrato
    uint256 public immutable GENESIS_TIMESTAMP;
    
    // Mapping para tracking de mints
    mapping(address => bool) public hasClaimed;
    mapping(address => uint256) public claimTimestamp;
    
    // Estadísticas
    uint256 public totalMinted;
    
    // ============ Events ============
    
    event GenesisClaimed(
        address indexed claimer,
        uint256 indexed tokenId,
        uint256 timestamp
    );
    
    event MetadataUpdated(
        string newBaseURI,
        uint256 timestamp
    );
    
    event ContractPaused(uint256 timestamp);
    event ContractUnpaused(uint256 timestamp);
    
    // ============ Errors ============
    
    error MaxSupplyReached();
    error AlreadyClaimed();
    error InvalidSupply();
    error EmptyBaseURI();
    
    // ============ Constructor ============
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        string memory baseURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        if (maxSupply == 0) revert InvalidSupply();
        
        MAX_SUPPLY = maxSupply;
        _baseTokenURI = baseURI;
        GENESIS_TIMESTAMP = block.timestamp;
    }
    
    // ============ Mint Functions ============
    
    /**
     * @dev Permite a cualquier usuario reclamar un Genesis NFT gratis
     * @notice Solo se puede reclamar un NFT por wallet
     */
    function claimGenesis() external whenNotPaused {
        if (totalMinted >= MAX_SUPPLY) revert MaxSupplyReached();
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        totalMinted++;
        
        hasClaimed[msg.sender] = true;
        claimTimestamp[msg.sender] = block.timestamp;
        
        _safeMint(msg.sender, tokenId);
        
        emit GenesisClaimed(msg.sender, tokenId, block.timestamp);
    }
    
    // ============ View Functions ============
    
    /**
     * @dev Retorna la URI completa del token
     */
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override 
        returns (string memory) 
    {
        _requireOwned(tokenId);
        
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string.concat(baseURI, tokenId.toString(), ".json")
            : "";
    }
    
    /**
     * @dev Retorna información completa de un claimer
     */
    function getClaimerInfo(address claimer) 
        external 
        view 
        returns (
            bool claimed,
            uint256 timestamp,
            uint256 tokenId
        ) 
    {
        claimed = hasClaimed[claimer];
        timestamp = claimTimestamp[claimer];
        
        // Si reclamó, encontrar su tokenId
        if (claimed) {
            for (uint256 i = 0; i < totalMinted; i++) {
                if (ownerOf(i) == claimer) {
                    tokenId = i;
                    break;
                }
            }
        }
    }
    
    /**
     * @dev Retorna cuántos NFTs quedan disponibles
     */
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalMinted;
    }
    
    /**
     * @dev Verifica si la colección está completa
     */
    function isComplete() external view returns (bool) {
        return totalMinted >= MAX_SUPPLY;
    }
    
    /**
     * @dev Retorna el porcentaje de mint completado (con 2 decimales)
     */
    function mintProgress() external view returns (uint256) {
        return (totalMinted * 10000) / MAX_SUPPLY; // 10000 = 100.00%
    }
    
    // ============ Owner Functions ============
    
    /**
     * @dev Actualiza la base URI para los metadatos
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        if (bytes(newBaseURI).length == 0) revert EmptyBaseURI();
        _baseTokenURI = newBaseURI;
        emit MetadataUpdated(newBaseURI, block.timestamp);
    }
    
    /**
     * @dev Pausa el contrato en caso de emergencia
     */
    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(block.timestamp);
    }
    
    /**
     * @dev Despausa el contrato
     */
    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(block.timestamp);
    }
    
    /**
     * @dev Mint especial del owner (para team, colaboradores, etc.)
     * Solo puede ser usado antes de que la colección esté completa
     */
    function ownerMint(address to, uint256 quantity) external onlyOwner {
        if (totalMinted + quantity > MAX_SUPPLY) revert MaxSupplyReached();
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter++;
            totalMinted++;
            
            _safeMint(to, tokenId);
            emit GenesisClaimed(to, tokenId, block.timestamp);
        }
    }
    
    // ============ Internal Functions ============
    
    /**
     * @dev Base URI para metadata
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // ============ Utility Functions ============
    
    /**
     * @dev Retorna información general del contrato
     */
    function getCollectionInfo() 
        external 
        view 
        returns (
            string memory collectionName,
            string memory collectionSymbol,
            uint256 maxSupply,
            uint256 minted,
            uint256 remaining,
            uint256 genesisTime,
            bool isPaused
        ) 
    {
        collectionName = name();
        collectionSymbol = symbol();
        maxSupply = MAX_SUPPLY;
        minted = totalMinted;
        remaining = MAX_SUPPLY - totalMinted;
        genesisTime = GENESIS_TIMESTAMP;
        isPaused = paused();
    }
}
