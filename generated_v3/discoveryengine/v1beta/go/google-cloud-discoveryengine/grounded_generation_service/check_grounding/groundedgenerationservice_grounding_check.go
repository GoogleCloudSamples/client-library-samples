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

// [START discoveryengine_v1beta_groundedgenerationservice_check_grounding]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// checkGrounding verifies whether an answer candidate is grounded in the provided facts.
func checkGrounding(ctx context.Context, w io.Writer, projectID string) error {
	groundingConfig := "default_grounding_config"

	client, err := discoveryengine.NewGroundedGenerationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGroundedGenerationClient: %w", err)
	}
	defer client.Close()

	groundingConfigPath := fmt.Sprintf("projects/%s/locations/global/groundingConfigs/%s", projectID, groundingConfig)

	req := &discoveryenginepb.CheckGroundingRequest{
		GroundingConfig: groundingConfigPath,
		AnswerCandidate: "Rayleigh scattering makes the sky appear blue.",
		Facts: []*discoveryenginepb.GroundingFact{
			{
				FactText: "Rayleigh scattering causes the sky to appear blue during the day.",
			},
		},
	}

	resp, err := client.CheckGrounding(ctx, req)
	if err != nil {
		return fmt.Errorf("CheckGrounding: %w", err)
	}

	fmt.Fprintf(w, "Support score: %f\n", resp.GetSupportScore())
	return nil
}

// [END discoveryengine_v1beta_groundedgenerationservice_check_grounding]
