'use babel';

import SlotAztecView from './slot-aztec-view';
import { CompositeDisposable } from 'atom';

export default {

  slotAztecView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotAztecView = new SlotAztecView(state.slotAztecViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotAztecView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-aztec:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotAztecView.destroy();
  },

  serialize() {
    return {
      slotAztecViewState: this.slotAztecView.serialize()
    };
  },

  toggle() {
    console.log('SlotAztec was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
