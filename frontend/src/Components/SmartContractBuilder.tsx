import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { compileContract } from './api-calls';
import { Context } from '../State/Store';
import Typography from '@mui/material/Typography';



export default function SmartContractBuilder() {
    const [state, dispatch] = useContext(Context);
    const [code, setCode] = useState(`TxContract MyToken(owner: Address, mut remain: U256) {\n  pub payable fn buy(from: Address, alphAmount: U256) -> () {\n    let tokenAmount = alphAmount * 1000\n    assert!(remain >= tokenAmount)\n    let tokenId = selfTokenId!()\n    transferAlph!(from, owner, alphAmount)\n    transferTokenFromSelf!(from, tokenId, tokenAmount)\n    remain = remain - tokenAmount\n  }\n}`)
    const [helperText, setHelperText] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
    }, [state.wallets])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleContractSubmit = (code: String) => {
        compileContract(code).then((response) => {
            if (response.status === 200) {
                setIsError(false)
                setHelperText("successfully compiled!")
                dispatch({ type: "SET_CONTRACT_CODE", payload: response.data.code })

            }
            else {
                setIsError(true)
                setHelperText(response.response.data.detail)
            }
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
            <Typography variant="caption" display="block" gutterBottom color={isError ? "error" : ""}>
                {helperText}
            </Typography>
        </Box>
    )
}