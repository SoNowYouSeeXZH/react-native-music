type PublicKeysProps<T> = T & {
    [key: string]: any;
};
type MusicItemProps = {
    src: ImageSourcePropType;
    title: string;
    description: string;
    url: string;
};
type MusicDataProps = Array<MusicItemProps>;
