import loading from './loading.json';

export const SPINNER_TYPES = {
  loading,
};

interface OptionsProps {
  loop?: boolean;
  autoplay?: boolean;
  rendererSettings?: any;
}

export const getOptions = ({ loop = true, autoplay = true, rendererSettings }: OptionsProps) => ({
  loop,
  autoplay,
  animationData: SPINNER_TYPES.loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    ...rendererSettings,
  },
});
