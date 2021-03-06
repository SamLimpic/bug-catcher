import Swal from 'sweetalert2'
import { AppState } from '../AppState'

export default class Notification {
  /**
 *
 * @param {string} title The title text.
 * @param {string} text The body text.
 * @param {string} icon 'success', 'error', 'info', 'warning', or 'question'.
 * @param {string} confirmButtonText The text of your confirm button.
 * -----------------------------------
 * {@link https://sweetalert2.github.io/#configuration|Check out Sweet Alerts}
 */
  static async confirmAction(title = 'Are you sure?', text = "You won't be able to revert this!", icon = 'warning', confirmButtonText = 'Yes, delete it!') {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonColor: '#a83620',
        confirmButtonColor: '#543c65',
        background: '#f7f8e0',
        confirmButtonText: confirmButtonText
      })
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  /**
 *
 * @param {string} title The title text
 * @param {string} display 'success', 'error', 'info', 'warning', or 'question'.
 * @param {string} position 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
 * @param {number} timer Time in milliseconds.
 * @param {boolean} progressBar Show progress bar or not respectively.
 * -----------------------------------
 * {@link https://sweetalert2.github.io/#configuration|Check out Sweet Alerts}
 */
  static toast(title = 'Warning!', display = 'warning', position = 'top-end', timer = 3000, progressBar = true) {
    Swal.fire({
      title: title,
      icon: display,
      position: position,
      timer: timer,
      timerProgressBar: progressBar,
      toast: true,
      showConfirmButton: false
    })
  }

  static async image() {
    const pokeBug = AppState.activePokeBug
    const text = pokeBug.flavor_text_entries.findIndex(p => p.language.name === 'en')
    await Swal.fire({
      title: `You caught a ${pokeBug.name[0].toUpperCase() + pokeBug.name.slice(1)}!`,
      text: `${pokeBug.flavor_text_entries[text].flavor_text.replaceAll('', ' ')}`,
      imageUrl: `${AppState.activeImg}`,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: `It's a ${pokeBug.name[0].toUpperCase() + pokeBug.name.slice(1)}!`,
      confirmButtonText: 'Go to its Page!',
      confirmButtonColor: '#543c65',
      background: '#f7f8e0'
    })
  }

  static async textArea() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: `Note on ${AppState.activeBug.title}`,
      inputPlaceholder: 'Add your note here...',
      inputAttributes: {
        'aria-label': 'Add your note here'
      },
      showCancelButton: true,
      cancelButtonColor: '#a83620',
      confirmButtonText: 'Add your note',
      confirmButtonColor: '#543c65',
      background: '#f7f8e0'
    })

    if (text) {
      AppState.activePost = {
        bug: AppState.activeBug.id,
        body: text
      }
    }
  }

  static async modal() {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Your Bug',
      html:
        `<form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Bug Name</label>
            <input type="text" class="form-control bg-light" id="swal-input1" value="${AppState.activeBug.title}">
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Bug Description</label>
            <textarea class="form-control bg-light" id="swal-input2" rows="3">${AppState.activeBug.description}</textarea>
          </div>
        </form>`,
      confirmButtonText: 'Submit your changes',
      confirmButtonColor: '#543c65',
      background: '#f7f8e0',
      showCancelButton: true,
      cancelButtonColor: '#a83620',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })

    if (formValues) {
      AppState.activePost = {
        title: document.getElementById('swal-input1').value,
        description: document.getElementById('swal-input2').value
      }
    }
  }
}
