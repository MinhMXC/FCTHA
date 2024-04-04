export default function parseFullMessages(full_messages: string[]): string {
    return full_messages.reduce((x, y) => x + "\n" + y);
}