module.exports = {
    newNote: async (parent, args, { models }) => {
        // In-memory mutation of noteValues
        // let noteValue = {
        //     id: String(notes.length +1),
        //     content: args.content,
        //     author: 'Adam Scott'
        // };
        // notes.push(noteValue);
        // return noteValue;

        // Async mutation of noteValues in MongoDB
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { content, id }, { models }) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    }
}