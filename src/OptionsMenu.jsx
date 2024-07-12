import './OptionsMenu.css'
import React, { useState } from 'react'
import optionsLogo from './assets/optionsPageLogo.png'
import { playToggleClick } from './Sounds'
import { handleControls } from './ControlMenu'

// Separate component for toggle switches
const ToggleSwitch = ({ id, label, checked, onChange }) => (
    <div className="col2">
        <h2 className="category">{label}</h2>
        <label className="switch" htmlFor={id}>
            <input type="checkbox" className="vocab" id={id} onChange={onChange} checked={checked} />
            <div className="slider round"></div>
        </label>
    </div>
)

// Data for vocabulary categories
const vocabCategories = [
    { id: 'Fruits', label: 'Fruits 🍎' },
    { id: 'Vegetables', label: 'Vegetables 🥕' },
    { id: 'FoodDrink', label: 'Food & Drink 🍔' },
    { id: 'Animals', label: 'Animals 🐶' },
    { id: 'Sports', label: 'Sports ⚾' },
    { id: 'Stationery', label: 'Stationery ✏️' },
    { id: 'SchoolRooms', label: 'School Rooms 🏫' },
    { id: 'Locations', label: 'Locations 📮' },
    { id: 'Nature', label: 'Nature 🌳' },
    { id: 'MonthsSeasons', label: 'Months & Seasons 🌸' },
    { id: 'OrdinalNumbers', label: 'Ordinal Numbers 📅' },
    { id: 'Subjects', label: 'Subjects 📚' },
    { id: 'DailyLife', label: 'Daily Life 🛌' },
    { id: 'People', label: 'People 🧑' },
    { id: 'BodyParts', label: 'Body Parts 👁️' },
    { id: 'Objects', label: 'Objects 👜' },
    { id: 'Tastes', label: 'Tastes 🌶️' },
    { id: 'Adjectives', label: 'Adjectives 💪' },
    { id: 'Occupations', label: 'Occupations 👮‍♀️' },
    { id: 'Colors', label: 'Colors 🎨' },
    { id: 'Numbers', label: 'Numbers 🔢' },
    { id: 'Shapes', label: 'Shapes 🟨' },
    { id: 'AlphabetUppercase', label: 'Alphabet (Uppercase) 🔠' },
    { id: 'AlphabetLowercase', label: 'Alphabet (Lowercase) 🔡' },
    { id: 'Countries', label: 'Countries 🌎' },
    { id: 'Feelings', label: 'Feelings 😴' },
    { id: 'Weather', label: 'Weather 🌤️' },
    { id: 'DaysTimes', label: 'Days & Times 🌃' },
    { id: 'Clothing', label: 'Clothing 👕' },
    { id: 'SnacksDesserts', label: 'Snacks & Desserts 🍨' },
    { id: 'Verbs', label: 'Verbs 💃' },
    { id: 'HobbiesActivities', label: 'Hobbies & Activities 🎮' },
    { id: 'SchoolClubs', label: 'School Clubs 🎸' },
    { id: 'SchoolEvents', label: 'School Events 🏅' },
    { id: 'AnnualEvents', label: 'Annual Events 🎎' },
]

// Data for question types
const questionTypes = [
    { id: 'Image', label: 'Image' },
    { id: 'English', label: 'English' },
    { id: 'Japanese', label: 'Japanese' },
]

const TimeLimit = ({ value, onChange }) => (
    <div className="col2">
        <h2 className="category">Time limit</h2>
        <label className="switch">
            <select value={value} onChange={onChange}>
                <option value="5">0:05</option>
                <option value="32">0:30</option>
                <option value="45">0:45</option>
                <option value="60">1:00</option>
                <option value="90">1:30</option>
                <option value="120">2:00</option>
            </select>
        </label>
    </div>
)

const OptionsMenu = ({ onSelectOption, mode }) => {
    const [checkedVocab, setCheckedVocab] = useState([])
    const [timeLimit, setTimeLimit] = useState(60)
    const [questionType, setQuestionType] = useState(['Image', 'Repeat'])

    const renderModeOptions = () => {
        switch(mode) {
            case 'Normal':
                return normalOptions
            case 'TeamBattle':
                return (
                    <>
                        {normalOptions}
                        {teamOptions}
                    </>
                )
            default:
                return null
        }
      };

    const handleSelectedVocab = (event) => {
        playToggleClick()
        const category = event.target.id.replace('vocab', '')
        setCheckedVocab(prev => 
            event.target.checked 
                ? [...prev, category] 
                : prev.filter(c => c !== category)
        )
    }

    const handleTimeLimitChange = (event) => {
        playToggleClick()
        setTimeLimit(parseInt(event.target.value))
    }

    const handleQuestionType = (event) => {
        playToggleClick()
        const selectedType = event.target.id.replace('question', '')
        setQuestionType(prev => 
            event.target.checked 
                ? [...prev, selectedType] 
                : prev.filter(c => c !== selectedType)
        )
    }

    const handleNextButton = () => {
        playToggleClick()
        if (checkedVocab.length === 0) {
            alert("Please select a category type!")
        } else if (questionType.length === 0) {
            alert("Please select a question type!")
        } else {
            onSelectOption('GameScreen', checkedVocab, 0, timeLimit, questionType)
        }
    }

    const normalOptions = (
        <React.Fragment>
            <input type="radio" id="vocabOptions" name="optionTabs" defaultChecked />
                <label id="tabTitle" htmlFor="vocabOptions">Vocab</label>
                <div className="tab">
                    <div className="vocab-columns">
                        <div className="col">
                            {vocabCategories.slice(0, Math.ceil(vocabCategories.length / 2)).map(category => (
                                <ToggleSwitch 
                                    key={category.id}
                                    id={`vocab${category.id}`}
                                    label={category.label}
                                    checked={checkedVocab.includes(category.id)}
                                    onChange={handleSelectedVocab}
                                />
                            ))}
                        </div>
                        <div className="col">
                            {vocabCategories.slice(Math.ceil(vocabCategories.length / 2)).map(category => (
                                <ToggleSwitch 
                                    key={category.id}
                                    id={`vocab${category.id}`}
                                    label={category.label}
                                    checked={checkedVocab.includes(category.id)}
                                    onChange={handleSelectedVocab}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <input type="radio" id="modifierOptions" name="optionTabs" />
                <label id="tabTitle" htmlFor="modifierOptions">Modifiers</label>
                <div className="tab">
                    <div className="vocab-columns">
                        <div className="col">
                            {questionTypes.map(type => (
                                <ToggleSwitch 
                                    key={type.id}
                                    id={`question${type.id}`}
                                    label={type.label}
                                    checked={questionType.includes(type.id)}
                                    onChange={handleQuestionType}
                                />
                            ))}
                        </div>
                        <div className="col">
                            <TimeLimit 
                                value={timeLimit}
                                onChange={handleTimeLimitChange}
                            />
                            <ToggleSwitch 
                                id="questionRepeat"
                                label="No repeats"
                                checked={questionType.includes('Repeat')}
                                onChange={handleQuestionType}
                            />
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )

    const teamOptions = (
        <React.Fragment>
                <input type="radio" id="teamOptions" name="optionTabs" defaultChecked />
                <label id="tabTitle" style={{width: "33.33333333333%" }} htmlFor="teamOptions">Teams</label>
                <div className="tab">

                </div>
        </React.Fragment>
    )

    return (
        <>
            <img id="optionsLogo" src={optionsLogo} alt="Options Logo" />
            <div id="optionTabs">
                {
                    renderModeOptions()
                }
            </div>
            <div className="controls">
                {handleControls('btnMainMenu', onSelectOption)}
                {handleControls('btnFullscreen')}
                {handleControls('btnNext', handleNextButton)}
            </div>
        </>
    )
}

export default OptionsMenu