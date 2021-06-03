import './styles.scss';
import { Component } from '../../../../core/templates/Component';
import { DefaultInputText } from '../../../../core/components/common/DefaultInputText';
import { Button } from '../../../../core/components/common/DefaultButton';
import { StateManager } from '../../../../core/services/state';

interface LocalState {
  userName: string,
}

export class ProfileAvatar extends Component<HTMLDivElement> {
  private userNameInput: HTMLInputElement | null;
  private confirmButtonHTML: HTMLButtonElement | null;
  private profileUserNameHTML: HTMLHeadingElement | null;
  protected localState: LocalState;
  private stateManager: StateManager;

  static TextObject = {
    ConfirmButtonText: 'Подтвердить',
    UserNamePlaceholder: 'Ваш Никнейм',
  };

  constructor(
    private userNickname: string,
    private profileImagePath: string = './assets/profile/user.svg',
  ) {
    super('div', 'profile-avatar');
    this.userNameInput = null;
    this.confirmButtonHTML = null;
    this.profileUserNameHTML = null;
    this.localState = {
      userName: '',
    };
    this.stateManager = new StateManager();
  }

  updateProfilePage(newUserName: string): void {
    if (this.profileUserNameHTML) {
      this.profileUserNameHTML.innerText = newUserName;
      this.stateManager.updateState((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          userName: newUserName,
        },
      }));
    }
  }

  renderProfileBlock(): void {
    const { ConfirmButtonText, UserNamePlaceholder } = ProfileAvatar.TextObject;
    const profileImage = document.createElement('img');
    profileImage.className = 'profile-avatar__image';
    profileImage.src = this.profileImagePath;

    this.profileUserNameHTML = document.createElement('h2');
    this.profileUserNameHTML.className = 'profile-avatar__user-name';
    this.profileUserNameHTML.innerText = this.userNickname;

    const userNameBlock = document.createElement('div');
    userNameBlock.className = 'profile-avatar__user-name-block';
    this.confirmButtonHTML = new Button(
      'profile-avatar__confirm-button',
      ConfirmButtonText,
    ).render();
    this.userNameInput = new DefaultInputText(
      'profile-avatar__user-text-input',
      UserNamePlaceholder,
    ).render();
    userNameBlock.append(this.userNameInput, this.confirmButtonHTML);
    this.container.append(profileImage, this.profileUserNameHTML, userNameBlock);
  }

  render(): HTMLDivElement {
    this.renderProfileBlock();
    this.setListener('change-profile-name', 'change', this.userNameInput, (event) => {
      const target = event.target as HTMLInputElement;
      this.localState.userName = target.value;
    });
    this.setListener('confirm-button-click', 'click', this.confirmButtonHTML, () => {
      const { userName } = this.localState;
      this.updateProfilePage(userName);
      if (this.userNameInput) {
        this.userNameInput.value = '';
      }
    });
    return this.container;
  }
}
