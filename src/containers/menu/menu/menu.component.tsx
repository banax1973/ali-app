import { MENU_CAPTION, MORE } from '@src/config';
import React from 'react';
import { SafeAreaView } from '@src/core/navigation';
import { ThemedComponentProps } from '@kitten/theme';
import { BottomNavigation, BottomNavigationTab} from '@kitten/ui';
import { LinkIcon_1, LinkIcon_2, LinkIcon_3, LinkIcon_4, LinkIcon_5 } from '@src/assets/icons';
import styles from './styles';

interface ComponentProps {
  selectedIndex: number;
  onTabSelect: (index: number) => void;
}

type Props = ThemedComponentProps & ComponentProps;

export class Menu extends React.Component<Props> {

  private onTabSelect = (index: number) => {
    this.props.onTabSelect(index);
  };

  public render(): React.ReactNode {
    const { selectedIndex } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
      
          <BottomNavigation
            appearance='noIndicator'
            selectedIndex={selectedIndex}
            onSelect={this.onTabSelect}>
           
            <BottomNavigationTab
              title= {MENU_CAPTION.activity}
              icon={LinkIcon_1}
            />
            <BottomNavigationTab
              title={MENU_CAPTION.mylibrary}
              icon={LinkIcon_2}
            />
            <BottomNavigationTab
              title={MENU_CAPTION.rankings}
              icon={LinkIcon_3}
            />
            <BottomNavigationTab
              title={MENU_CAPTION.ebooks}
              icon={LinkIcon_4}
            />
            <BottomNavigationTab
              title={MENU_CAPTION.more}
              icon={LinkIcon_5}
            />
          </BottomNavigation>   
      </SafeAreaView>
    );
  }
}
