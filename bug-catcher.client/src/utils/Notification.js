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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
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
      text: `${pokeBug.flavor_text_entries[text].flavor_text}`,
      imageUrl: `${AppState.activeImg}`,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: `It's a ${pokeBug.name[0].toUpperCase() + pokeBug.name.slice(1)}!`,
      confirmButtonText: 'Go to its Page!',
      confirmButtonColor: '#543c65',
      background: '#f7f8e0'
    })
  }

  async radio() {
    /* inputOptions can be an object or Promise */

    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          '#ff0000': 'Red',
          '#00ff00': 'Green',
          '#0000ff': 'Blue'
        })
      }, 1000)
    })

    const { value: color } = await Swal.fire({
      title: "What's that bug?!",
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })

    if (color) {
      Swal.fire({ html: `You selected: ${color}` })
    }
  }
}
