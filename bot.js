const Discord = require('discord.js');
const client = new Discord.Client();

// Eine Map für die Liste der User mit ihren Reaktionen
const userList = new Map();

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.partial) {
        try {
            reaction.fetch();
        } catch (error) {
            console.error('Fehler beim Abrufen der Reaktion:', error);
            return;
        }
    }

    // Überprüfe, ob die Reaktion in einem bestimmten Kanal ist
    if (reaction.message.channel.id === '1174436055034900590' && reaction.emoji.name === '👍') {
        // Füge den Benutzer zur Liste hinzu oder aktualisiere die Reaktion
        updateUserList(user, reaction.message);
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.partial) {
        try {
            reaction.fetch();
        } catch (error) {
            console.error('Fehler beim Abrufen der Reaktion:', error);
            return;
        }
    }

    // Überprüfe, ob die Reaktion in einem bestimmten Kanal ist
    if (reaction.message.channel.id === '1174436055034900590' && reaction.emoji.name === '👍') {
        // Entferne den Benutzer aus der Liste
        removeUserFromList(user, reaction.message);
    }
});

// Funktion zum Hinzufügen oder Aktualisieren eines Benutzers in der Liste
function updateUserList(user, message) {
    const userDisplayName = message.guild.members.cache.get(user.id).displayName;
    const userListEntry = `${userDisplayName} (${user.tag})`;

    if (!userList.has(user.id)) {
        // Hinzufügen
        userList.set(user.id, userListEntry);
    } else {
        // Aktualisieren
        removeUserFromList(user, message);
        userList.set(user.id, userListEntry);
    }

    // Aktualisiere die Anzeige im Nachrichteninhalt
    updateMessageContent(message);
}

// Funktion zum Entfernen eines Benutzers aus der Liste
function removeUserFromList(user, message) {
    userList.delete(user.id);
    updateMessageContent(message);
}

// Funktion zum Aktualisieren des Nachrichteninhalts mit der aktuellen Liste
function updateMessageContent(message) {
    const sortedUserList = Array.from(userList.values()).sort();
    const updatedContent = sortedUserList.join('\n');

    // Aktualisiere den Nachrichteninhalt
    message.edit(`**Liste der Benutzer:**\n${updatedContent}`);
}

client.login('MTE3NDQyOTM1MDM1NjA1ODE1Mw.G3_RCs.hEjRN-79ajmjiV1agFC4H3Re4k68n4LRY_tKnw\n');
