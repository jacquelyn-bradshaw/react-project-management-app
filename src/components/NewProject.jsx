import {useRef} from "react"

import Input from "./Input.jsx"
import Modal from "./Modal.jsx"

export default function NewProject ({onAddProject, onCancelAddProject}) {
  const modalRef = useRef()
  
  const titleRef = useRef()
  const descriptionRef = useRef()
  const dueDateRef = useRef()

  function handleSave () {
    const enteredTitle = titleRef.current.value
    const enteredDescription = descriptionRef.current.value
    const enteredDueDate = dueDateRef.current.value

    if (enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
        modalRef.current.open()
        return
    }

    onAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    })
  }

  return (
    <>
      <Modal ref={modalRef}>
        <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
        <p className="text-stone-600 mb-4"> Please enter a value for all input fields.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancelAddProject}
              className="text-stone-800 hover:text-stone-950">
                Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={titleRef} label="Title" />
          <Input ref={descriptionRef} label="Description" isTextarea />
          <Input type="date" ref={dueDateRef} label="Due Date" />
        </div>
      </div>
    </>
  )
}
