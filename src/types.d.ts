/** Type defintions **/

/* Create Album Data Type */
export type CreateAlbumData = {
	title: string,
	user_id: number 
}

/* Create Photo Data Type */
export type CreatePhotoData = {
	title: string,
	url: string
	comment?: string,
	user_id: number
}

/* Create User Data Type */
export type CreateUserData = {
	email: string,
	password: string,
	first_name: string,
	last_name: string
}

/* JWT Payload Type */
export type JwtPayload = {
	id: number,
	email: string,
	first_name: string,
	last_name: string,
	iat?: number,
	exp?: number
}

/* Update Album Data Type */
export type UpdateAlbumData = {
	title?: string
}

/* Update Photo Data Type */
export type UpdatePhotoData = {
	title?: string,
	url?: string
	comment?: string
}

/* Add Photo To Album Type */
export type AddPhotoToAlbumData = {
	id: number
}