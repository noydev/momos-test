import React, { FC } from 'react';
import { DataItemProps } from '../pages/Home';

const DataItem: FC<DataItemProps> = ({ type, url, origin }) => {
  return (
    <div>
      <div>
        <strong>Type</strong>: {type}
      </div>
      <div>
        <strong>Url</strong>: <a href={url}>{url}</a>
      </div>
      <div>
        <strong>Origin</strong>: {origin}
      </div>
    </div>
  );
};

export default DataItem;
