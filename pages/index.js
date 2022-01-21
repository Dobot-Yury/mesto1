import './index.css'
import { initialCards } from '../components/initial-сards.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import {
	popupProfile,
	popupCards,
	popupImage,
	placesTemplate,
	popupOpenButtonElement,
	popupOpenButtonCards,
	profileName,
	profileJob,
	formPopupProfile,
	formPopupCard,
	cardCase,
	nameInputProfile,
	jobInputProfile,
	config,
} from "../utils/constants"

/*Изменение имени и описания*/

/*Добавление карточки*/
const newCard = new PopupWithForm(popupCards, (item) =>{
	const newCards = createCard(item.cardname, item.link)
	cardsCatalogue.addItem(newCards)
	newCard.close()
})
newCard.setEventListeners()

const cardsCatalogue = new Section({
	items: initialCards,
	renderer:(item)=>{
		const cardElement = createCard(item.name, item.link)

		cardsCatalogue.addItem(cardElement)
	}
    },
	cardCase
)

cardsCatalogue.renderItems()

function createCard(name,link) {
	const card = new Card(name, link, placesTemplate, handleCardClick)
	return card.generateCard()
}

const popupCardView = new PopupWithImage(popupImage)
popupCardView.setEventListeners()

function handleCardClick(name, link){
	popupCardView.open(name, link)
}
/*popup*/

const profileInfo = new UserInfo({
	name: profileName,
	job: profileJob,
})

const popupProfileEdit = new PopupWithForm(popupProfile, (item) => {
	profileInfo.setUserInfo(item)
	popupProfileEdit.close()
},
formPopupProfile)
popupProfileEdit.setEventListeners()

popupOpenButtonElement.addEventListener('click', function(){
	popupProfileEdit.open()
	const origUserInfo = profileInfo.getUserInfo()
	nameInputProfile.value = origUserInfo.name
	jobInputProfile.value = origUserInfo.job
})

popupOpenButtonCards.addEventListener('click', function(){
	newCard.open()
	formValidatorCard.resetValidation()
})

formPopupCard.addEventListener('submit', cardsCatalogue)
formPopupProfile.addEventListener('submit',popupProfileEdit)

const formValidatorCard = new FormValidator(config, formPopupCard)
formValidatorCard.enableValidation()

const formValidatorProfile = new FormValidator(config, formPopupProfile )
formValidatorProfile.enableValidation()