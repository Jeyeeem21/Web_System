import Swal from 'sweetalert2'

// Custom styling for consistent theme
const customClass = {
  popup: 'rounded-xl shadow-2xl',
  title: 'text-2xl font-bold',
  htmlContainer: 'text-gray-600',
  confirmButton: 'bg-[#D4AF37] hover:bg-[#C4A030] text-black font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg',
  cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg',
  denyButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg'
}

/**
 * Show success alert for add/edit operations
 * @param {string} type - 'added' or 'updated'
 * @param {string} entity - e.g., 'Doctor', 'Patient', 'Service', 'Schedule'
 * @param {string} name - Optional name of the entity
 */
export const showSuccessAlert = (type, entity, name = '') => {
  const title = type === 'added' ? 'Added Successfully!' : 'Updated Successfully!'
  const text = name 
    ? `${entity} "${name}" has been ${type} successfully.`
    : `${entity} has been ${type} successfully.`
  
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    timer: 3000,
    timerProgressBar: true,
    customClass: customClass,
    buttonsStyling: false
  })
}

/**
 * Show delete confirmation dialog
 * @param {string} entity - e.g., 'Doctor', 'Patient', 'Service', 'Schedule'
 * @param {string} name - Optional name of the entity to delete
 * @returns {Promise<boolean>} - Returns true if confirmed, false if cancelled
 */
export const showDeleteConfirmation = async (entity, name = '') => {
  const text = name
    ? `Are you sure you want to delete "${name}"?`
    : `Are you sure you want to delete this ${entity.toLowerCase()}?`
  
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Delete Confirmation',
    text: text,
    html: `
      <p class="text-gray-600 mb-2">${text}</p>
      <p class="text-red-600 font-semibold text-sm">This action cannot be undone!</p>
    `,
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel',
    customClass: {
      ...customClass,
      confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold ml-2 px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg'
    },
    buttonsStyling: false,
    reverseButtons: true
  })
  
  return result.isConfirmed
}

/**
 * Show deleted success alert
 * @param {string} entity - e.g., 'Doctor', 'Patient', 'Service', 'Schedule'
 * @param {string} name - Optional name of the deleted entity
 */
export const showDeletedAlert = (entity, name = '') => {
  const text = name
    ? `${entity} "${name}" has been deleted.`
    : `${entity} has been deleted.`
  
  return Swal.fire({
    icon: 'success',
    title: 'Deleted!',
    text: text,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: customClass,
    buttonsStyling: false
  })
}

/**
 * Show error alert
 * @param {string} title - Error title
 * @param {string} message - Error message
 */
export const showErrorAlert = (title = 'Error', message = 'Something went wrong. Please try again.') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: customClass,
    buttonsStyling: false
  })
}

/**
 * Show validation error alert
 * @param {string} message - Validation error message
 */
export const showValidationError = (message) => {
  return Swal.fire({
    icon: 'warning',
    title: 'Validation Error',
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: customClass,
    buttonsStyling: false
  })
}

/**
 * Show info alert
 * @param {string} title - Info title
 * @param {string} message - Info message
 */
export const showInfoAlert = (title, message) => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: customClass,
    buttonsStyling: false
  })
}
