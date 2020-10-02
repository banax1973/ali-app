import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { Text } from '@kitten/ui';
import { HeartIconFill } from '@src/assets/icons';
import { theme } from '@src/config';
//import { textStyle} from '@src/components/common';

interface ComponentProps {
  children?: string;
}

export type LikeButtonProps = ThemedComponentProps & TouchableOpacityProps & ComponentProps;

export class LikeButton extends React.Component<LikeButtonProps> {

  public render(): React.ReactNode {
    const { style, children, ...restProps } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        {...restProps}>
        {HeartIconFill(styles.icon)}
        <Text
          style={styles.valueLabel}
          numberOfLines={1} 
          ellipsizeMode={'tail'}
          category='p2'>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: theme.proLikeButtonIcon,
  },
  valueLabel: {
    //...textStyle.subtitle,
    marginHorizontal: 8,
    color: theme.proLikeButtonText,
  },
});
