import React from 'react';
import { Block } from '@/core/models/block';
import { TextOption } from '@/core/models/option';
import { NavigationLink } from '@/core/models/navigation';
export interface GLTextBlockProps extends Block {
    fields: {
        blockTitle?: string;
        multiLangEditor?: string;
        isFullWidth?: boolean;
        backgroundColor?: TextOption;
        titleFontColor?: TextOption;
        fontColor?: TextOption;
        navigationLink?: NavigationLink;
    };
}
export declare const GLTextBlock: React.ComponentType<GLTextBlockProps> & {
    metadata: import("~/utils/withVersioning").ComponentMetadata;
};
