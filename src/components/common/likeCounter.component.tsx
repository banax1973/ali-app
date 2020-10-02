import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@kitten/ui';
import { HeartIconFill } from '@src/assets/icons';
import { theme } from '@src/config';
import { textStyle} from './style';

interface ComponentProps {
  children?: string;
}

export type LikeCounterProps = ComponentProps;

export class LikeCounter extends React.Component<LikeCounterProps> {

  public render(): React.ReactNode {
    const { style, children, ...restProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        {HeartIconFill(styles.icon)}
        <Text
          style={styles.valueLabel}
          numberOfLines={1} 
          ellipsizeMode={'tail'}
          category='p2'>
          {children}
        </Text>
      </View>
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
    ...textStyle.subtitle,
    marginHorizontal: 8,
    color: theme.proLikeButtonText,
  },
});
