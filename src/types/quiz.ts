export interface Question {
	id: string
	value: string
	answers: Answer[]
	correctAnswerId: string
}

export interface Answer {
	id: string
	value: string
}
