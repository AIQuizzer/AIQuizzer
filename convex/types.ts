export interface Answer {
	id: string
	value: string
}

export interface Question {
	id: string
	value: string
	answers: Answer[]
	correctAnswerId: string
}
