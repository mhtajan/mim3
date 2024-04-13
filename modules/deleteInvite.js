module.exports = ((client,invite,reason) => {
    client.guilds.cache.forEach(guild => {
        guild.invites.delete(invite.code,reason)
    });
})