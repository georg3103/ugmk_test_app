import React from 'react';
import { type ReactNode } from 'react'
import styles from "./Layout.module.scss";

type Props = {
  titleSlot?: ReactNode;
  contentSlot: ReactNode;
}

export function Layout(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {props.titleSlot}
        {props.contentSlot}
      </div>
    </div>
  )
}