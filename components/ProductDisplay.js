app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image"> <!--Attribute Binding-->
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <p v-if="inStock">In Stock</p><!--Conditional Rendering-->
                <p v-else>Out of Stock</p>

                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{detail}}</li><!--List Rendering-->
                </ul>
                <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateVariant(index)"
                    class="color-circle"
                    :style="{backgroundColor : variant.color}">
                </div><!--Class & Style Binding-->

                <button 
                    class="button" 
                    :class="{ disabledButton: !inStock }"
                    :disabled="!inStock"
                    v-on:click="addToCart">
                    Add to Cart
                </button><!--Event Handling--><!--Class & Style Binding-->

            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list><!--Forms & v-model-->
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data: function(){
        return{
            cart: 0,
            product:'Hobby horse',
            brand:'Ur Life With Hobby Horse',
            selectedVariant: 0,
            description:'This new line for kids features recreational universe built around imaginary miniature cowboys and cowgirls. Textile items, games and unique accessories create a real playground for everyone.',
            details: ['Made in France', 'Designed by Luna Caralada', 'Dimensions: L 39 x H 114 cm'],
            variants: [
                {id: 2234, color:'#0D0D0D', image: 'images/hobby_horse_black.png', quantity: 64},
                {id: 2235, color:'#E1D9D5', image: 'images/hobby_horse_white.png', quantity: 16},
                {id: 2236, color:'#E3C998', image: 'images/hobby_horse_brown.png', quantity: 0},
            ],
            reviews: []
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id) //Communicating Events
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },//Computed Properties
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },//Computed Properties
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return 15
        }
    }
})
