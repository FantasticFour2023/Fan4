// ratingComponent.js
import { LightningElement, api, track } from 'lwc';

export default class RatingComponent extends LightningElement {
    @api maxRating = 5; // Maximum rating value (default: 5)
    @track currentRating = 0; // Current selected rating

    get stars() {
        const stars = [];
        for (let i = 1; i <= this.maxRating; i++) {
            stars.push({
                index: i,
                rated: i <= this.currentRating
            });
        }
        return stars;
    }

    rate(rating) {
        this.currentRating = rating;
        const ratingEvent = new CustomEvent('ratingchange', { detail: rating });
        this.dispatchEvent(ratingEvent);
    }
}