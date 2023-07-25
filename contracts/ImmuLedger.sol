// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ImmuLedger {
    // Define a struct for a piece of research.
    struct Research {
        address publisher;
        uint timestamp;
        string title;
    }

    // This creates a state variable that stores a `Research` struct for each possible hash.
    mapping (bytes32 => Research) public researches;

    // The array to hold hashes of all researches
    bytes32[] public researchHashes;

    // publishResearch records a new piece of research.
    function publishResearch(string memory _title, bytes32 _hash) public {
        // Require that the research doesn't already exist.
        require(researches[_hash].timestamp == 0, "This research is already published.");

        // Record the publisher, the current time, and the title.
        researches[_hash] = Research(msg.sender, block.timestamp, _title);

        // Add the hash to the array
        researchHashes.push(_hash);
    }

    // getResearch returns the address of the publisher and the timestamp of a piece of research.
    function getResearch(bytes32 _hash) public view returns (address, uint256, string memory) {
        // Require that the research exists.
        require(researches[_hash].timestamp != 0, "This research does not exist.");

        return (researches[_hash].publisher, researches[_hash].timestamp, researches[_hash].title);
    }

    // Function to get all research hashes
    function getAllResearches() public view returns (bytes32[] memory) {
        return researchHashes;
    }
}