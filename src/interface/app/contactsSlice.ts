export type Contact = {
    id: string,
    username: string,
    avatarUrl: string,
    chatId?: string,
    bio: string
    status?: string
}

export type ContactState = {
    contacts: Contact[],
    searchedContacts: Contact[]
}

export type UpdateContact = {
    id: string,
    chatId: string,
}