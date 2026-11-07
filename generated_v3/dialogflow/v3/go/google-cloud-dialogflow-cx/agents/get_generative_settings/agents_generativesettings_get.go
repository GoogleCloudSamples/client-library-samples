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

// [START dialogflow_v3_agents_generativesettings_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// getGenerativeSettings retrieves the generative settings for a Dialogflow CX agent.
func getGenerativeSettings(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	languageCode := "en"
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/generativeSettings", projectID, locationID, agentID)

	var clientOpts []option.ClientOption
	if locationID != "" && locationID != "global" {
		clientOpts = append(clientOpts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewAgentsClient(ctx, clientOpts...)
	if err != nil {
		return fmt.Errorf("NewAgentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetGenerativeSettingsRequest{
		Name:         name,
		LanguageCode: languageCode,
	}

	response, err := client.GetGenerativeSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("GetGenerativeSettings failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved generative settings: %s\n", response.GetName())
	return nil
}

// [END dialogflow_v3_agents_generativesettings_get]
