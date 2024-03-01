export type Contact = {
    Id: string,
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
    Id: string,
    chatId: string,
}