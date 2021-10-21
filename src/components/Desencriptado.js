import React, { useContext, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import { ViewContext } from "./View";
import CryptoJS from "crypto-js";

export const Desencriptado = () => {
	const { encoded, encrypted, key, decoded, decrypted, setDecoded, setDecrypted } =
		useContext(ViewContext);

	const decode = (decrypted) => {
		const utf8 = CryptoJS.enc.Base64.parse(decrypted);
		const textPlain = CryptoJS.enc.Utf8.stringify(utf8);
		setDecoded(textPlain);
	};

	const decrypt = (encrypted, key) => {
		const bytes = CryptoJS.AES.decrypt(encrypted, key);
		const base64 = bytes.toString(CryptoJS.enc.Utf8);
		setDecrypted(base64);
	};

	const handleDecoded = useCallback(decode, [setDecoded]);

	const handleDecrypted = useCallback(decrypt, [setDecrypted]);

	useEffect(() => {
		if (encrypted.length > 0 && key.length > 0) {
			handleDecrypted(encrypted, key);
		}
	}, [encrypted, key, handleDecrypted]);

	useEffect(() => {
		if (decrypted.length > 0) {
			handleDecoded(decrypted);
		} else if (encoded.length > 0) {
			handleDecoded(encoded);
		}
	}, [decrypted, encoded, handleDecoded]);

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				Se ha recuperado la capa 1 (Base64)
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{key.length > 0
						? decrypted.length > 0
							? decrypted
							: "No se puede desencriptar.."
						: "Debe introducir una clave secreta para poder cifrar con AES..."}
				</Typography>
			</Box>
			<Typography variant="h6" sx={{ mb: 3, mt: 5 }}>
				Se ha recuperado el texto plano
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{decoded.length > 0 ? decoded : "No se puede desencriptar..."}
				</Typography>
			</Box>
		</React.Fragment>
	);
};
