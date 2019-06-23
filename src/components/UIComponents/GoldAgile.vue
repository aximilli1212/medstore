<template>
        <div >
            <v-card-media src="./static/img/caro/gold_caro_2.jpg" height="250" width="300">


            </v-card-media>

        </div>



</template>

<script>
    export default {
        name: "gold-agile",
        data () {
            return {
                options: {
                    arrows: false,

                    responsive: [
                        {
                            breakpoint: 400,
                            settings: {
                                dots: false,
                                speed:750,
                            }
                        },

                        {
                            breakpoint: 300,
                            settings: {
                                arrows: false,
                                dots: true,
                                infinite: false
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .agile {
        &__dots {
            bottom: 0;
            left: 50%;
            position: absolute;
            transform: translateX(-50%);
        }

        &__dot {
            button {
                background-color: transparent;
                border: 1px solid #fff;

                &:hover {
                    background-color: #fff;
                }
            }

            &--current {
                button {
                    background-color: #fff;
                }
            }
        }

        &__arrow {
            height: 100%;
            top: 0;
            width: 80px;

            &:hover {
                background-color: rgba(#000, .5);

                #arrow-svg {
                    fill: #fff;
                }
            }

            &[disabled] {
                display: none;
            }

            #arrow-svg {
                fill: rgba(#fff, .4);
                height: 25px;
            }
        }
    }

    .slide {
        background: {
            position: center;
            size: cover;
        }
        height: 500px;

        &:before {
            background-color: rgba(#000, .2);
            content: '';
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }

        &--1 {
            /*background-image: url(/static/img/1.jpg);*/
        }

    }
</style>