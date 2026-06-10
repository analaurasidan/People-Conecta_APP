import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

type FlashListProps<ItemT> = FlatListProps<ItemT> & {
  estimatedItemSize?: number;
};

export function FlashList<ItemT>({
  estimatedItemSize,
  ...props
}: FlashListProps<ItemT>) {
  return <FlatList {...props} />;
}

export default FlashList;
