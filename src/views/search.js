import { html } from '../library.js';
import { search } from "../api/offers.js";
import { offerCard } from "./catalog.js";

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

            <div>
                ${offers && offers.length > 0
                        ? html` <h3>Results:</h3>
                            <div class="offer-wrapper">
                                ${offers.map(offerCard)}
                            </div>`
                        : html`<p id="search-result">No results found</p>`
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

        // TODO: "No results found" message should only be showing when results are searched
        if (query.length === 0) {
            ctx.render(document.getElementById('search-result').textContent = "");
            return;
        }

        const offers = await search(query);
        //ctx.page.redirect(`/search-results?query=${query}`);
        ctx.render(searchTemplate(offers, onSubmit));
    }
}