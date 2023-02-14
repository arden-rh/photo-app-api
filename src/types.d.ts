/** 
 * Type defintions 
 * */

/* Create Album Data Type */
export type CreateAlbumData = {
	title: string
}

/* Create Photo Data Type */
export type CreatePhotoData = {
	title: string,
	url: string
	comment?: string
}

/* Create User Data Type */
export type CreateUserData = {
	email: string,
	password: string,
	first_name: string,
	last_name: string
}

export type JwtPayload = {
	sub: number,
	name: string,
	email: string,
	iat?: number,
	exp?: number,
}
