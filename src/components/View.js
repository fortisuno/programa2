import React, { createContext, useContext, useState } from 'react'
import { StepperContext } from './HorizontalStepper'
import Box from '@mui/material/Box'
import { TextoPlano } from './TextoPlano'
import { Encriptado } from './Encriptado'
import { Desencriptado } from './Desencriptado'

export const ViewContext = createContext()

export const View = () => {

	const { activeStep } = useContext(StepperContext)

	const [textPlain, setTextPlain] = useState('');
	const [key, setKey] = useState('');
	const [encoded, setEncoded] = useState('');
	const [decoded, setDecoded] = useState('');
	const [encrypted, setEncrypted] = useState('');
	const [decrypted, setDecrypted] = useState('');

	return (
		<Box sx={{px: 1, py: 5}}>
			<ViewContext.Provider value={{
				textPlain,
				key,
				encoded,
				decoded,
				encrypted,
				decrypted,
				setTextPlain,
				setKey,
				setEncoded,
				setDecoded,
				setEncrypted,
				setDecrypted
			}}>
				{activeStep === 0 ? (
					<TextoPlano/>
				) : activeStep === 1 ? (
					<Encriptado/>
					) : (
					<Desencriptado/>
				)}
			</ViewContext.Provider>
		</Box>
	)
}
