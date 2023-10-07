    const mongoose =  require("mongoose")

    const topicSchema = new mongoose.Schema({
        domain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Domain', // Reference to the Domain schema
            required: true,
        },
        // category: {
        //     type: mongoose.Schema.Types.String, // Reference the category field from the Domain schema
        //     ref: 'Domain',
        //     required: true,
        // },    
        category: {
            type: String,
            required: true,
          },
        topicName: {
            type: String,
            required: true,
        },
        resource: String,
        week: String,
        day: String,
        // other topic-related fields
        });
        

    const topic = mongoose.model("topic",topicSchema);
    module.exports = topic


