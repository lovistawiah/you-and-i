export type Contact = {
    Id: string,
    username: string,
    avatarUrl: string,
    chatId?: string,
    bio: string
}

export type ContactState = {
    contacts: Contact[],
    searchedContacts: Contact[]
}