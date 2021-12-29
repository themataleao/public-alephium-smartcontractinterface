import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { compileContract } from './api-calls';
import { Context } from '../State/Store';



export default function SmartContractSection() {
    const [state, dispatch] = useContext(Context);
    const [code, setCode] = useState(`TxContract MyToken(owner: Address, mut remain: U256) {
        pub payable fn buy(from: Address, alphAmount: U256) -> () {
          let tokenAmount = alphAmount * 1000
          assert!(remain >= tokenAmount)
          let tokenId = selfTokenId!()
          transferAlph!(from, owner, alphAmount)
          transferTokenFromSelf!(from, tokenId, tokenAmount)
          remain = remain - tokenAmount
        }
      }`)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
        console.log("this is the state: ", state)
    };

    const handleContractSubmit = (code: String) => {
        compileContract(code).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row'>
                <Box padding={2} width={'50%'}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Smart Contract Code"
                        multiline
                        value={code}
                        fullWidth
                        onChange={handleChange}
                    />
                </Box>
                <Box padding={2} width={'50%'} textAlign="start">
                    <SyntaxHighlighter language="rust" wrapLongLines={true} style={docco}>
                        {code}
                    </SyntaxHighlighter>
                </Box>
            </Box>
            <Box>
                <Button
                    variant='outlined'
                    onClick={() => handleContractSubmit(code)}>compile contract</Button>
            </Box>
        </Box>
    )
}