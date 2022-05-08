class ConfirmReveal {
  static ID = 'confirm-reveal';

  static init() {
    JournalSheet.prototype._onShowPlayers = ConfirmReveal.prototype._onShowPlayers;
  }

  // Rewrite _onShowPlayers method
  async _onShowPlayers(event) {
    ConfirmReveal.log(false, 'Confirming whether to show asset to players');
    event.preventDefault();
    await this.submit();

    let permissions = this.object.data.permission;

    ConfirmReveal.log(false, permissions);
  }

  // Debug logger - use with the Developer Mode module
  // Syntax: ConfirmReveal.log(false, 'Message');
  static log(force, ...args) {
    const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

    if (shouldLog) {
      console.log(this.ID, '|', ...args);
    }
  }
}

// Setup hooks for module
Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(ConfirmReveal.ID);
});
Hooks.on('init', ConfirmReveal.init);
