'use server';

import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';

import logger from '@/lib/logger';

const client = new Client();

export const autocompleteWithLatLng = async (input: string) => {
  if (!input) return [];

  try {
    const autocompleteResponse = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_AUTOCOMPLETE || '',
        components: ['country:ng'],
        types: PlaceAutocompleteType.address,
        language: 'en',
      },
    });

    const predictions = autocompleteResponse.data.predictions;

    // predictions = predictions.filter((p) =>
    //   p.description.toLowerCase().includes('lagos')
    // );

    // Fetch details for each place
    const placesWithDetails = await Promise.all(
      predictions.map(async (prediction) => {
        try {
          const placeDetailsResponse = await client.placeDetails({
            params: {
              place_id: prediction.place_id,
              key: process.env.NEXT_PUBLIC_GOOGLE_AUTOCOMPLETE || '',
              fields: ['geometry', 'address_component'],
            },
          });

          const location = placeDetailsResponse.data.result.geometry?.location;
          const addressComponents =
            placeDetailsResponse.data.result.address_components || [];

          // Helper function to find address component by type
          const findAddressComponent = (type: string) => {
            return (
              addressComponents.find((component) =>
                (component.types as string[]).includes(type),
              )?.long_name || ''
            );
          };

          return {
            description: prediction.description,
            place_id: prediction.place_id,
            lat: location?.lat || null,
            lng: location?.lng || null,
            streetAddress:
              findAddressComponent('route') ||
              findAddressComponent('street_address'),
            streetNumber: findAddressComponent('street_number'),
            city:
              findAddressComponent('locality') ||
              findAddressComponent('administrative_area_level_2'),
            state: findAddressComponent('administrative_area_level_1'),
            stateCode:
              addressComponents.find((component) =>
                (component.types as string[]).includes(
                  'administrative_area_level_1',
                ),
              )?.short_name || '',
            region: findAddressComponent('administrative_area_level_1'),
            postalCode: findAddressComponent('postal_code'),
          };
        } catch (error) {
          logger(error);
          return {
            description: prediction.description,
            place_id: prediction.place_id,
            lat: null,
            lng: null,
            streetAddress: '',
            streetNumber: '',
            city: '',
            state: '',
            stateCode: '',
            region: '',
            postalCode: '',
          };
        }
      }),
    );

    return placesWithDetails;
  } catch (error) {
    logger(error);
    return [];
  }
};
