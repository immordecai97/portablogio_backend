import { buildApiUrl } from "../utils/buildApiUrl.js";

const { env } = process;

// Variables siempre requeridas
const alwaysRequired = [
	"PROTOCOL",
	"DOMAIN",
	"PORT",
	"CLIENT_URLS"
];

// Variables de BD solo requeridas si NO existe DATABASE_URL
const dbRequired = [
	"DB_USER",
	"DB_HOST",
	"DB_NAME",
	"DB_PASSWORD",
	"DB_PORT"
];

for (const key of alwaysRequired) {
	if (env[key] === undefined) {
		throw new Error(`Error config: The ${key} environment variable is missing`);
	}
}

// Solo validar variables de BD si no hay DATABASE_URL
if (!env.DATABASE_URL) {
	for (const key of dbRequired) {
		if (env[key] === undefined) {
			throw new Error(`Error config: The ${key} environment variable is missing (or provide DATABASE_URL)`);
		}
	}
}

/**
 * Se usa Record<string, string> para "asegurar" a TypeScript que todas las 
 * propiedades de 'env' son strings y no 'undefined'. 
 * Record<Llave, Valor> mapea tipos de un objeto.
 */
const validatedEnv = env as Record<string, string>;

export const {
	DB_USER,
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	PROTOCOL,
	DOMAIN,
	CLIENT_URLS
} = validatedEnv;

// Convertir a number para TypeScript
export const DB_PORT = Number(validatedEnv.DB_PORT);
export const PORT = Number(validatedEnv.PORT);

export const API_URL = buildApiUrl({ PROTOCOL, DOMAIN, PORT: String(PORT) });