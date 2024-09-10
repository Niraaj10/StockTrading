import mongoose, {Schema} from 'mongoose'

const favoriteStockSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

export const FavoriteStock = mongoose.model('FavoriteStock', favoriteStockSchema);
