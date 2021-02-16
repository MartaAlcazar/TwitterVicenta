window.addEventListener('load', () => {
    initFormEvents();
    renderTweets();
    resetAllTweets();
    initModalEvents();
    renderMenu();

});


/**
 * Variable global
 */
const tweets = [
    {
        text: '¡Valentín!',
        likes: 5,

        picture: "./assets/img/profile_pic.png",
        username: 'theRealVicenta42',
        nickname: 'Vicenta Benito',


    }
];






/**
 * MENU DINÁMICO
 */

const renderMenu = () => {

    let menuHTML = "";

    for (let i = 0; i < twitterData.menuNavegation.length; i++) {
        menuHTML +=
            `
        <div class="menu_item">
            <span class="fa ${twitterData.navegationIcons[i]}"></span>
            ${twitterData.menuNavegation[i]}
        </div>
       
    `

    };
    document.querySelector('.main_menu').innerHTML = menuHTML;
}

/**
 * USER DATA
 */


/**
 * Iniciar los eventos de formularios
 */

const initFormEvents = () => {
    const form = document.forms.new_tweet;
    const textArea = form.elements.tweet_something;

    /**
     * form submit
     */

    form.addEventListener('submit', (ev) => {
        //
        ev.preventDefault();

        if (textArea.value != "") {
            //
            tweets.push({
                text: textArea.value,
                likes: 0,
                dateCreation: new Date(),

                picture: "./assets/img/profile_pic.png",
                username: 'theRealVicenta42',
                nickname: 'Vicenta Benito',
            });

        }

        form.reset();

        renderTweets();


    });


    


};



const renderTweets = () => {

    const tweetFeed = document.querySelector('.tweet_feed');
    let HTMLString = "";

    tweets.forEach(tweet => {
        HTMLString += `
    <div class="tweet">    
        <div class="user_pic">
            <img src=${tweet.picture} alt="foto de perfil">

        </div>
        <div class="user">
            <div class="name">${tweet.nickname}</div>
            <div class="username">@${tweet.username}</div>
            <span class="fa fa-circle"></span>
            <div class="time">15h</div>
           <span class="fa fa-trash"></span>
        </div>
        <div class="tweet_text">
           ${tweet.text}
        </div>
        <div class="interactions">
            <div class="comment">
                <span class="fa fa-comment-o"></span>
                <span class="number_of_comments">2</span>
            </div>
            <div class="retweet">
                <span class="fa fa-retweet"></span>
                <span class="number_of_retweets">2</span>
            </div>
            <div class="likes">
                <span class="fa fa-heart-o"></span>
                <span class="number_of_likes">${tweet.likes}</span>
            </div>
        </div>

    </div>
    `
    });


    tweetFeed.innerHTML = HTMLString;
    initTweeetEvents();
    renderTweetsAmount();

};


const renderTweetsAmount = () => {
    const amount = tweets.length;
    const amountDom = document.querySelector('.aside_trends .amount');

    const HTMLString = `Hay ${amount} tweets`;
    amountDom.innerHTML = HTMLString;



};



const resetAllTweets = () => {
    const amountDom = document.querySelector('.aside_trends .reset');
    amountDom.addEventListener('click', () => {
        tweets.splice(0);
        renderTweets();
    });


};



/**
 * 
 * 
 */

const initTweeetEvents = () => {

    const tweetsDom = document.querySelectorAll('.tweet_feed .tweet');

    tweetsDom.forEach((tweetDom, i) => {

        /**
         * BORRAR TWEETS
         */
        const trash = tweetDom.querySelector('.fa-trash');
        trash.addEventListener('click', () => {
            console.log(i);
            //
            tweets.splice(i, 1);
            renderTweets();
        });

        /**
        * DARLE LIKE
        */
        const like = tweetDom.querySelector('.likes');
        like.addEventListener('click', () => {
            console.log(i);
            //
            tweets[i].likes++;
            renderTweets();
        });

    });

};



/**
 * OVERLAY
 */
const initModalEvents = () => {
    const toggle = document.querySelector('.create_new_tweet');
    const modalTweet = document.querySelector('.modal_tweet');
    const closeModal = document.querySelector('.close_button');
    const overlay = document.querySelector('.modal_overlay');

    toggle.addEventListener('click', () => {
        modalTweet.classList.add('opened');
        document.body.style.overflow = 'hidden';
    });


    closeModal.addEventListener('click', () => {
        modalTweet.classList.remove('opened');
        document.body.style.overflow = '';


    });

    overlay.addEventListener('click', () => {
        modalTweet.classList.remove('opened');
        document.body.style.overflow = '';

    })

    modalFormEvents();
};

const modalFormEvents = () => {
    const form = document.forms.new_tweet_modal;
    const textArea = form.elements.tweet_something;
    const modalTweet = document.querySelector('.modal_tweet');

    /**
     * form submit
     */

    form.addEventListener('submit', (ev) => {
        //
        ev.preventDefault();

        if (textArea.value != "") {
            //
            tweets.push({
                text: textArea.value,
                likes: 0,
                dateCreation: new Date(),

                picture: "./assets/img/profile_pic.png",
                username: 'theRealVicenta42',
                nickname: 'Vicenta Benito',
            });

        }

        form.reset();
        modalTweet.classList.remove('opened');
        document.body.style.overflow = '';


        renderTweets();

    });

};