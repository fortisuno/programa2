import React, { useCallback, useContext, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { ViewContext } from "./View";
import CryptoJS from "crypto-js";

export const Encriptado = () => {
	const { textPlain, key, encoded, encrypted, setEncoded, setEncrypted } = useContext(ViewContext);

	const encode = (textPlain) => {
		const utf8 = CryptoJS.enc.Utf8.parse(textPlain);
		const base64 = CryptoJS.enc.Base64.stringify(utf8);
		setEncoded(base64);
	};

	const encrypt = (encoded, key) => {
		const enc = CryptoJS.AES.encrypt(encoded, key).toString();
		setEncrypted(enc);
	};

	const handleEncoded = useCallback(encode, [setEncoded]);

	const handleEncrypted = useCallback(encrypt, [setEncrypted]);

	useEffect(() => {
		if (textPlain.length > 0) {
			handleEncoded(textPlain);
		}
	}, [textPlain, handleEncoded]);

	useEffect(() => {
		if (encoded.length > 0 && key.length > 0) {
			handleEncrypted(encoded, key);
		}
	}, [encoded, key, handleEncrypted]);

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				Capa 1 (Base64)
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{encoded.length > 0 ? encoded : "No se ha introducido un texto plano..."}
				</Typography>
			</Box>
			<Typography variant="h6" sx={{ mb: 3, mt: 5 }}>
				Capa 2 (AES)
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{key.length > 0
						? encrypted.length > 0
							? encrypted
							: "No se ha introducido un texto plano..."
						: "Debe introducir una clave secreta para poder cifrar con AES..."}
				</Typography>
			</Box>
		</React.Fragment>
	);
};
