pragma solidity^0.8.0;

contract StringManipulation {

    function length(string memory str) pure public returns(uint){
        bytes memory str_bytes = bytes(str);
        return str_bytes.length;
    }

    function concat(string memory str1, string memory str2) pure public returns(string memory){
        bytes memory str1_bytes = bytes(str1);
        bytes memory str2_bytes = bytes(str2);
        string memory str = new string(str1_bytes.length + str2_bytes.length);
        bytes memory str_bytes = bytes(str);

        uint k=0;
        for(uint i=0;i<str1_bytes.length;i++){
            str_bytes[k] = str1_bytes[i];
            k++;
        }
        for(uint i=0;i<str2_bytes.length;i++){
            str_bytes[k] = str2_bytes[i];
            k++;
        }

        return string(str_bytes);
    }
}