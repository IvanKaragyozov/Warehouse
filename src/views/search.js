import { html } from '../library.js';
import {getOfferById, search} from "../api/offers.js";
import {offerCard} from "./catalog.js";

const searchTemplate = (offers, onSubmit) => html`
    <section id="search">
        <div id="search-form" class="form">
            <h2>Search Offers</h2>

            <form id="search-bar" @submit="${onSubmit}" class="search-form">
                <input
                        type="text"
                        name="search"
                        id="search-query"
                        placeholder="Search..."
                        required
                />
                <button type="submit">Search</button>
            </form>

            <h3>Results:</h3>

            <div>
                ${offers
                        ? html`
                            <div class="offer-wrapper">
                                ${offers.map(offerCard)}
                            </div>`
                        : html`<p>No results found</p>` //TODO: fix correct message when there are no results
            } 
            </div>
        </div>
    </section>
`;

export async function searchView(ctx) {

    ctx.render(searchTemplate(null, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('search').trim();

        const offers = await search(query);
        //ctx.page.redirect(`/search-results?search?query=${query}`);
        ctx.render(searchTemplate(offers, onSubmit));
    }

}