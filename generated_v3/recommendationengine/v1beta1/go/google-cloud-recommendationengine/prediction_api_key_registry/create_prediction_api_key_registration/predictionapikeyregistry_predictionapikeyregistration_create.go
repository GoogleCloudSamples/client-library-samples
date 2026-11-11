// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]

import (
	"context"
	"fmt"
	"io"

	recommendationengine "cloud.google.com/go/recommendationengine/apiv1beta1"
	recommendationenginepb "cloud.google.com/go/recommendationengine/apiv1beta1/recommendationenginepb"
)

// createPredictionApiKeyRegistration registers an API key with the Prediction API Key Registry.
func createPredictionApiKeyRegistration(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/default_catalog/eventStores/default_event_store", projectID, locationID)
	predictionAPIKeyRegistration := &recommendationenginepb.PredictionApiKeyRegistration{
		ApiKey: "AIzaSyExampleApiKey",
	}

	client, err := recommendationengine.NewPredictionApiKeyRegistryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPredictionApiKeyRegistryClient: %w", err)
	}
	defer client.Close()

	req := &recommendationenginepb.CreatePredictionApiKeyRegistrationRequest{
		Parent:                       parent,
		PredictionApiKeyRegistration: predictionAPIKeyRegistration,
	}

	resp, err := client.CreatePredictionApiKeyRegistration(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePredictionApiKeyRegistration: %w", err)
	}

	fmt.Fprintf(w, "Registered API key: %s\n", resp.GetApiKey())
	return nil
}

// [END recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]
