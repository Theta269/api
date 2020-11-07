module.exports = {
    notes: async (parent, args, { models }) => {
        return await models.Note.find();
    },
    note: async (parent, args, { models }) => {
        // In-memory find of a specific note
        // return notes.find(note => note.id === args.id);

        // Async find of a specific note in MongoDB
        return await models.Note.findById(args.id);
    }
}