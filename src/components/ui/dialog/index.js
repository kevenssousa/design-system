import { render, createVNode } from "vue"
import DialogComponent from "./Dialog.vue"

let globalConfig = {
  className: "",
}

let seed = 1

class Dialog {
  constructor(options) {
    globalConfig = Object.assign({}, globalConfig, options)
  }
  open(config = {}) {
    let dialogWrapper = null
    let dialogVM = null
    const id = "ui-dialog-" + seed++
    dialogWrapper = document.createElement("div")
    dialogWrapper.id = id
    dialogVM = createVNode(
      DialogComponent,
      {
        ...globalConfig,
        ...config,
        id
      },
      null
    )
    render(dialogVM, dialogWrapper)
    document.body.appendChild(dialogWrapper)
  }
  delete(config = {}) {
    config.type = 'danger'
    config.destructLabel = 'Deletar'
    config.destructIcon = 'delete'
    config.destructVariant = 'danger'
    this.open(config)
  }
  prompt(config = {}) {
    config = {
      ... {
        type: 'prompt',
        destructVariant: 'danger',
        destructLabel: 'Confirmar',
      },
      ...config
    }
    this.open(config)
  }
  confirm(config = {}) {
    config.type = 'confirm'
    config.destructLabel = config.destructLabel || 'Confirmar'
    config.destructIcon = 'check'
    config.destructVariant = 'success'
    config.hideCancel = true
    this.open(config)
  }
}

export default new Dialog()
