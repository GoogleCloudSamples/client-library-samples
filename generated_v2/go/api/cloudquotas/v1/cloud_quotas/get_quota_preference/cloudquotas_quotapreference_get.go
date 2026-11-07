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

// [START cloudquotas_v1_cloudquotas_quotapreference_get]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
)

// getQuotaPreference retrieves a quota preference by name.
func getQuotaPreference(ctx context.Context, w io.Writer, projectID string, locationID string, quotaPreferenceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/quotaPreferences/%s", projectID, locationID, quotaPreferenceID)

	client, err := cloudquotas.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.GetQuotaPreferenceRequest{
		Name: name,
	}

	quotaPreference, err := client.GetQuotaPreference(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetQuotaPreference failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved quota preference: %s\n", quotaPreference.GetName())
	return nil
}

// [END cloudquotas_v1_cloudquotas_quotapreference_get]
